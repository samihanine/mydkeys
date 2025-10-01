import { Button } from '@repo/ui/components/button';

export const AiFillInputButton = ({ setValue }: { setValue: (value: string) => void }) => {
  return <Button onClick={() => setValue('ai generated value')}>Fill Input</Button>;
};
