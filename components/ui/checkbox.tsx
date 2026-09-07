import { Checkbox as Primitive } from '@base-ui/react/checkbox';
import { Check } from 'lucide-react';
export function Checkbox(props: Primitive.Root.Props) {
  return (
    <Primitive.Root data-slot="checkbox" {...props}>
      <Primitive.Indicator>
        <Check size={13} />
      </Primitive.Indicator>
    </Primitive.Root>
  );
}
