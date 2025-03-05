import SchedulingService from '../utils/schedulingService';
import { getGuard } from './DBEmployee';
import { sendEmail } from '../utils/nodeMailer';
import { getAllUsers } from './DBUsers';
import { Role } from '@prisma/client';
import { Prisma } from '@prisma/client';

export async function guardCourseReminder(
guard: Prisma.EmployeeGetPayload<{include: {guard: true}}>
) {

  const schedulingService = new SchedulingService();

  let timeToAlert = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
  if (guard.guard?.nextCourse) {
    timeToAlert = guard.guard?.nextCourse;

    timeToAlert.setMonth(timeToAlert.getMonth() - 2);
  }

  schedulingService.scheduleWeeklyJob(
    `reminde-course-${guard.employeeId}`,
    async (jobName) => {
      const employeeId = jobName.split('-').pop();

      const guard = await getGuard(employeeId as string);
      const managers = await getAllUsers({
       OR:[ {
          role: Role.manager,
          site: guard.data?.site||undefined
        },
        {role: Role.admin}]
      });

      const mailsToSend = managers.reduce((acc,manager) =>acc+= `${manager.email},`,'').concat(guard.data?.email || '');

      console.log('guard', mailsToSend);

      if (
        !guard.data?.guard?.nextCourse ||
        isWithinTwoMonths(new Date(guard.data?.guard?.nextCourse), new Date())
      ) {
        //  Send mail to guard and managers
        const emailResult = await sendEmail({
          to: mailsToSend, // Use the user's email address
          subject: `פקיעת תוקף רשיון נשק, ${guard.data?.firstName} ${guard.data?.lastName} ${guard.data?.employeeId}!`,
          text: `Thank you for signing up, ${guard.data?.email}!`,
          html: `<h1>Welcome!</h1><p>Thank you for joining our app, ${guard.data?.email}!</p>`
        });

        if (!emailResult.success) {
          console.error('Error sending email', emailResult.message);
          // Handle the email error, maybe log it or display a message to the user.
        } else {
          console.log('Email sent success', emailResult.message);
        }
      } else {
        schedulingService.cancelJob(jobName);
      }
    },
    timeToAlert
  );
}

function isWithinTwoMonths(targetDate: Date, referenceDate: Date): boolean {
  const twoMonthsFuture = new Date(referenceDate);
  twoMonthsFuture.setMonth(twoMonthsFuture.getMonth() + 2);
  return targetDate <= twoMonthsFuture;
}
