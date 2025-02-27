import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { signInAction } from '@/lib/actions/auth';
import Image from 'next/image';
import logo from '../../assets/images/security-logo.png';




export default async function LoginPage() {
      // Create admin user
      // const adminUser = await prisma.user.upsert({
      //   where:{
      //     userName:'admin'
      //   },
      //   create: {
      //     userName: 'admin',
      //     password: await saltAndHashPassword('admin123'),
      //     role: Role.admin,
      //     site: 'אור עקיבא',
      //     email:'benshuan@gmail.com'
      //   },
      //   update:{
      //   }
      // });
      
      // const guardUser = await prisma.user.upsert({
      //   where:{
      //     userName:'guard'
      //   },
      //   create: {
      //     userName: 'guard',
      //     password: await saltAndHashPassword('guard123'),
      //     role: Role.guard,
      //     site: 'אור עקיבא',
      //     email:'benshuan@gmail.com'
      //   },
      //   update:{
      //   }
      // });
  return (
    <div
      className="min-h-screen flex flex-col justify-between items-center pt-12 
       md:items-center"
    >
      <h1 className="text-4xl font-bold">מחלקת ביטחון</h1>


      <div
        className="w-full h-[70vh] rounded-t-[3rem] border-none rounded-b-none bg-white
      md:rounded-[3rem] md:w-[80vw]  md:flex md:flex-row md:m-auto "
      >
         <div className="w-1/2 h-full  hidden md:block relative ">
           <Image
            src={logo.src}
            alt="security"
            fill
            className="absolute top-0 left-0 object-fit scale-90 "
           

                   />
         </div>
        <Card className="w-full h-full bg-foreground border-none rounded-t-[3rem] md:w-1/2  md:rounded-r-none md:rounded-l-[3rem]">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">
              התחברות
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              action={signInAction}
              className="w-full justify-around flex flex-col gap-12 mt-12 min-w-[300px]
              md:w-1/2 md:mx-auto
            *:h-14 *:rounded-full *:border-2 *:border-secondary  *:text-2xl"
            >

              <Input type="text" name="userName" placeholder="שם משתמש" />
              <Input type="password" name="password" placeholder="סיסמא" />

              <Button className="w-full bg-secondary">התחבר</Button>
            </form>
          </CardContent>
        </Card>
       
      </div>
    </div>

  );
}
