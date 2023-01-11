import { ButtonProps } from './types';

import styles from './button.module.scss';

export default function Button({ text, icon }: ButtonProps) {
  return (
    <div className={styles.button}>
      {icon && <img src={icon} />}
      <span>{text}</span>
    </div>
  );
}
