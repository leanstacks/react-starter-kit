import { cn } from 'common/utils/css';
import FAIcon, { FAIconProps } from '../Icon/FAIcon';
import Alert, { AlertProps } from './Alert';
import AlertContent from './AlertContent';
import AlertDescription from './AlertDescription';
import AlertHeader from './AlertHeader';
import AlertTitle from './AlertTitle';

/**
 * Properties for the `ErrorAlert` component.
 */
export interface ErrorAlertProps
  extends Omit<AlertProps, 'variant'>,
    Partial<Pick<FAIconProps, 'icon'>> {
  title?: string;
  description: string;
}

/**
 * The `ErrorAlert` component renders a bespoke `Alert` layout for error
 * messages.
 */
const ErrorAlert = ({
  className,
  description,
  icon = 'circleExclamation',
  testId = 'alert-error',
  title,
  ...props
}: ErrorAlertProps): JSX.Element => {
  return (
    <Alert variant="danger" className={cn(className)} testId={testId} {...props}>
      <FAIcon icon={icon} size="lg" testId={`${testId}-icon`} />
      <AlertContent testId={`${testId}-content`}>
        {!!title && (
          <AlertHeader testId={`${testId}-header`}>
            <AlertTitle testId={`${testId}-title`}>{title}</AlertTitle>
          </AlertHeader>
        )}
        <AlertDescription testId={`${testId}-description`}>{description}</AlertDescription>
      </AlertContent>
    </Alert>
  );
};

export default ErrorAlert;
