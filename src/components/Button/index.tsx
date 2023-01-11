import { ButtonProps } from './types';

import styles from './button.module.scss';

export default function Button({ text, icon, disabled }: ButtonProps) {
  return (
    <div className={styles.button}>
      <img src={icon} />
      <span>{text}</span>
    </div>
  );
}
