'use client';

// Components
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form/form';

// Types and utilities
import useRideLogForm from '@/lib/utils/hooks/useRideLogForm';



function RideLogForm() {
  const { form, renderField, isPending ,updateRideLog,RideLogFields,createRideLog} =useRideLogForm();

  console.log('form', form.formState.errors)
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(createRideLog)}
        className=" grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
      >
        {RideLogFields.map(renderField)}
        <Button
          type="submit"
          className="col-span-1 md:col-span-2 "
          disabled={isPending}
        >
          {isPending ? 'טוען...' : "הוסף נסיעה"}
        </Button>
      </form>
    </Form>
  );
}

export default RideLogForm;
