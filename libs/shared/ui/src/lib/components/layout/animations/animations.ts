import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata
} from '@angular/animations';

export const sidenavAnimation: AnimationTriggerMetadata = trigger(
  'sidenavAnimation',
  [
    state('expanded', style({ width: '{{ width }}px' }), {
      params: { width: 0 }
    }),
    state('compact', style({ width: '{{ width }}px' }), {
      params: { width: 0 }
    }),
    transition(
      'compact <=> expanded',
      animate('0.4s cubic-bezier(0.25, 0.8, 0.25, 1)')
    )
  ]
);

export const contentAnimationLeft: AnimationTriggerMetadata = trigger(
  'contentAnimationLeft',
  [
    state('expanded', style({ 'margin-left': '{{ margin }}px' }), {
      params: { margin: 0 }
    }),
    state('compact', style({ 'margin-left': '{{ margin }}px' }), {
      params: { margin: 0 }
    }),
    transition(
      'expanded <=> compact',
      animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
    )
  ]
);

export const contentAnimationRight: AnimationTriggerMetadata = trigger(
  'contentAnimationRight',
  [
    state('expanded', style({ 'margin-right': '{{ margin }}px' }), {
      params: { margin: 0 }
    }),
    state('compact', style({ 'margin-right': '{{ margin }}px' }), {
      params: { margin: 0 }
    }),
    transition(
      'expanded <=> compact',
      animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
    )
  ]
);
