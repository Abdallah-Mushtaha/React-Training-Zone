import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import TextInput from "@/components/ui/TextInput";

const SignInForm = () => {
  const validation = {
    // Validation
  };

  const handleSubmit = () => {
    // Handle submit
  };

  return (
    <Card>
      <TextInput className="mb-4" label="Email" />
      <TextInput className="mb-4" label="Password" type="password" />
      <Button title="Sign In" />
      <div></div>
    </Card>
  );
};

export default SignInForm;
