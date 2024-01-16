export type InputProps = {
  title?: string;
  placeholder: string;
  error: boolean;
  errorMessage?: string;
  value?: string | undefined;
  name?: string;
  focused?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};
