import { Select as Primitive } from '@base-ui/react/select';
import { Check, ChevronDown } from 'lucide-react';
import { Children, isValidElement, type ReactNode } from 'react';
import './select.css';

type OptionProps = {
  value?: string | number;
  children?: ReactNode;
  disabled?: boolean;
};

/** Option children describe choices; the popup is rendered by Base UI. */
export function Select({
  value,
  onValueChange,
  children,
  disabled,
  name,
  id,
  required,
  'aria-label': ariaLabel,
}: {
  value: string | number;
  onValueChange: (value: string) => void;
  children: ReactNode;
  disabled?: boolean;
  name?: string;
  id?: string;
  required?: boolean;
  'aria-label'?: string;
}) {
  const items = Children.toArray(children)
    .filter(isValidElement<OptionProps>)
    .map(({ props }) => ({
      value: String(
        props.value ??
          (typeof props.children === 'string' ||
          typeof props.children === 'number'
            ? props.children
            : ''),
      ),
      label: props.children,
      disabled: props.disabled,
    }));
  return (
    <Primitive.Root
      value={String(value)}
      items={items}
      onValueChange={(next) => {
        if (next !== null) onValueChange(next);
      }}
      disabled={disabled}
      name={name}
      id={id}
      required={required}
    >
      <Primitive.Trigger
        aria-label={ariaLabel}
        className="ui-select-trigger"
        data-slot="select-trigger"
      >
        <Primitive.Value className="ui-select-value" />
        <Primitive.Icon>
          <ChevronDown size={16} />
        </Primitive.Icon>
      </Primitive.Trigger>
      <Primitive.Portal>
        <Primitive.Positioner
          className="ui-select-positioner"
          sideOffset={6}
          align="start"
          alignItemWithTrigger={false}
        >
          <Primitive.Popup className="ui-select-popup">
            <Primitive.List className="ui-select-list">
              {items.map((item) => (
                <Primitive.Item
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                  className="ui-select-item"
                >
                  <Primitive.ItemText>{item.label}</Primitive.ItemText>
                  <Primitive.ItemIndicator className="ui-select-indicator">
                    <Check size={16} />
                  </Primitive.ItemIndicator>
                </Primitive.Item>
              ))}
            </Primitive.List>
          </Primitive.Popup>
        </Primitive.Positioner>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
