// Example with improved Image component:
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import logo from '../../assets/images/security-logo.png';
import LoginForm from './login-form';

export default async function LoginPage() {
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
            src={logo}
            alt="Security System Logo"
            fill
            className="absolute top-0 left-0 object-fit scale-90 "
            priority
          />
        </div>
        <Card className="w-full h-full bg-foreground border-none rounded-t-[3rem] md:w-1/2  md:rounded-r-none md:rounded-l-[3rem]">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">
              התחברות
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
