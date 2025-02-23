import { useTranslation } from 'react-i18next';

import { PropsWithClassName } from 'common/utils/types';
import { StorageKey } from 'common/utils/constants';
import storage from 'common/utils/storage';
import Dropdown from 'common/components/Dropdown/Dropdown';
import FAIcon from 'common/components/Icon/FAIcon';
import DropdownContent from 'common/components/Dropdown/DropdownContent';
import DropdownItem from 'common/components/Dropdown/DropdownItem';
import Button from './Button';

/**
 * Properties for the `LanguageToggle` component.
 * @see {@link PropsWithClassName}
 */
export interface LanguageToggleProps extends PropsWithClassName {}

/**
 * The `LanguageToggle` component renders a `Dropdown` which allows users
 * to select the language in which they wish to view the application.
 * @param {LanguageToggleProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const LanguageToggle = ({ className }: LanguageToggleProps): JSX.Element => {
  const { i18n } = useTranslation();

  /**
   * Set the application-wide langague code used for i18n.
   * @param {string} lng - A langage code, e.g. `en` or `es`.
   */
  const setLanguage = (lng: string) => {
    storage.setItem(StorageKey.Language, lng);
    i18n.changeLanguage(lng);
  };

  return (
    <Dropdown
      toggle={
        <Button variant="text" size="icon">
          <FAIcon icon="language" size="2x" title="Select Language" />
        </Button>
      }
      content={
        <DropdownContent className="text-sm">
          <DropdownItem onClick={() => setLanguage('en')} testId="dropdown-item-en">
            <Button variant="text" className="h-auto p-0!" title="English Language">
              English
            </Button>
          </DropdownItem>
          <DropdownItem onClick={() => setLanguage('fr')} testId="dropdown-item-fr">
            <Button variant="text" className="h-auto p-0!" title="French Language">
              French
            </Button>
          </DropdownItem>
          <DropdownItem onClick={() => setLanguage('es')} testId="dropdown-item-es">
            <Button variant="text" className="h-auto p-0!" title="Spanish Language">
              Spanish
            </Button>
          </DropdownItem>
        </DropdownContent>
      }
      className={className}
      testId="dropdown-language"
    />
  );
};

export default LanguageToggle;
