import { useForm } from "react-hook-form";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useLogin } from "@/hooks/useLogin";

const loginFormSchema = z.object({
  username: z.string().min(1, "Nama pengguna tidak boleh kosong!"),
  password: z.string().min(1, "Kata sandi tidak boleh kosong!"),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

const LoginDialog = () => {
  const { setUser } = useLogin();
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = handleSubmit(({ username, password }) => {
    setUser({
      username: username,
      password: password,
    });
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Login Admin</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <div className="">
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <FormField
              control={control}
              name="username"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nama pengguna</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem className="mb-2">
                    <FormLabel>Kata sandi</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" autoComplete="on" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex justify-end">
              <Button type="submit">Login</Button>
            </div>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};

export default LoginDialog;
