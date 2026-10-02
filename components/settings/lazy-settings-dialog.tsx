'use client';

import { useState, type ComponentProps } from 'react';
import dynamic from 'next/dynamic';
import type { SettingsDialog as SettingsDialogImpl } from './index';

// The settings dialog (every provider panel, the usage dashboard with echarts, ...)
// is large and closed on most visits, so only fetch it the first time it opens.
const SettingsDialogLoader = dynamic(() => import('./index').then((m) => m.SettingsDialog), {
  ssr: false,
});

type SettingsDialogProps = ComponentProps<typeof SettingsDialogImpl>;

export function SettingsDialog(props: SettingsDialogProps) {
  // Stay mounted after the first open so the close animation and the dialog's
  // local state (selected section/provider) behave as before.
  const [hasOpened, setHasOpened] = useState(props.open);
  if (props.open && !hasOpened) setHasOpened(true);

  return hasOpened ? <SettingsDialogLoader {...props} /> : null;
}
