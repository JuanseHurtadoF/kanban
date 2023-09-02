export type InputProps = {
  title?: string;
  placeholder: string;
  error: boolean;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | undefined;
  name?: string;
  focused?: boolean;
};
