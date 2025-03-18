import { Prisma, User } from "@prisma/client";
import { render } from "@react-email/render";
import getConfig from "next/config";

async function ResetPasswordEmail(user:User,newPass:string) {
  const { publicRuntimeConfig } = getConfig();
  const baseUrl = publicRuntimeConfig.baseUrl;

  return render(
    <html>
      <body dir="rtl">
        <h1>
          שלום {user.userName}
        </h1>

        <h2> סיסמתך אופסה בהצלחה</h2>

        <h2>סיסמתך החדשה היא: {newPass}</h2>
        
      </body>
    </html>
  );
}

export default ResetPasswordEmail;
