import type { ComponentProps } from 'react';

/** Shared native select preserves platform keyboard and mobile picker behavior. */
export function NativeSelect(props: ComponentProps<'select'>) {
  return <select data-slot="native-select" {...props} />;
}
