import { ButtonProps } from './types';

import styles from './button.module.scss';

export default function Button({ text, icon, onClick }: ButtonProps) {
  return (
    <div className={styles.button} onClick={onClick}>
      {icon && <img src={icon} />}
      <span>{text}</span>
    </div>
  );
}
