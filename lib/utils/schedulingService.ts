import schedule from 'node-schedule';

interface ISchedulingService {
  scheduleJob(
    name: string,
    scheduleRule: string | schedule.RecurrenceRule,
    jobFunction: (data?:any) => void
  ): void;
  scheduleWeeklyJob(
    name: string,
    jobFunction: (data?:any) => void,
    startDate: Date,
    timeToAlert:number
  ): void;
  cancelJob(name: string): void;
  listJobs(): void;
}

class SchedulingService implements ISchedulingService {
 static jobs: Record<string, schedule.Job>={};

  scheduleJob(
    name: string,
    scheduleRule: schedule.Spec | Date,
    jobFunction: (data?:any) => void,
  ) {
    if (SchedulingService.jobs[name]) {
      console.warn(`Job with name "${name}" already exists. Replacing.`);
      this.cancelJob(name);
    }

      const job = schedule.scheduleJob(scheduleRule, (data) => {
        console.log(`Running job: ${name}`);
        jobFunction(name); 
      });
    

    SchedulingService.jobs[name] = job;
    console.log(
      `Job "${name}" scheduled. Next invocation: ${job.nextInvocation()}`
    );
  }
  scheduleWeeklyJob(
    name: string,
    jobFunction: (data?:any) => void,
    startDate: Date,
    timeToAlert:number=10
  ) {
    try {


    if (SchedulingService.jobs[name]) {
      console.warn(`Job with name "${name}" already exists. Replacing.`);
      this.cancelJob(name);
    }

    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = startDate.getDay();
    rule.hour = timeToAlert;
    rule.minute = 0;
    rule.second = 30;
    rule.year = startDate.getFullYear();
    rule.month = startDate.getMonth();
    rule.date = startDate.getDate();

    const job = schedule.scheduleJob(rule, () => {
      console.log(`Running job: ${name}`);
      jobFunction(name);
    });

    SchedulingService.jobs[name] = job;

    console.log(
      `Job "${name}" scheduled. Next invocation: ${job.nextInvocation()}`
    );
  } catch (error) {
    console.log('error', error)
  }
  }

  cancelJob(name: string) {
    const job = SchedulingService.jobs[name];
    if (job) {
      job.cancel();
      delete SchedulingService.jobs[name];
      console.log(`Job "${name}" canceled.`);
    } else {
      console.warn(`Job "${name}" not found.`);
    }
  }

  listJobs() {
    console.log(SchedulingService.jobs);
  }
}

export default SchedulingService;
