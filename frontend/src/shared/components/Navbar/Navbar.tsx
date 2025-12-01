import { VxrIcon, VnFlag, EnFlag } from '@/assets';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, type SetStateAction, type Dispatch } from 'react';
import { PhoneOutlined } from '@ant-design/icons';

export const LANGUAGE = {
  VI: 'vi',
  EN: 'en',
};

export const Navbar = ({
  setIsLoginOpen,
  isLoginOpen,
}: {
  setIsLoginOpen: Dispatch<SetStateAction<boolean>>;
  isLoginOpen: boolean;
}) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || LANGUAGE.VI);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setLanguage(i18n.language || LANGUAGE.VI);
  }, [i18n.language]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleLanguage = () => {
    const newLanguage = language === LANGUAGE.VI ? LANGUAGE.EN : LANGUAGE.VI;
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const currentFlag = language === LANGUAGE.VI ? VnFlag : EnFlag;

  return (
    <div className="flex items-center justify-between max-h-[72px] bg-[#2474E5] p-4 sm:px-5 text-white">
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="logo">
          <Link to="/">
            <img src={VxrIcon} alt="Logo" />
          </Link>
        </div>
        <Link
          to=""
          className="flex flex-col justify-center text-white h-10 text-sm font-bold relative cursor-pointer transition-colors duration-300"
        >
          <span className="block leading-[1.4] mb-0.5">{t('commissionLine1')}</span>
          <span className="block leading-[1.4]">{t('commissionLine2')}</span>
        </Link>
      </div>

      {/* Right */}
      <ul className="flex flex-wrap justify-end gap-6 list-none m-0 p-0">
        <li className="flex items-center whitespace-nowrap">
          <Link to="" className="text-white text-sm no-underline">
            {t('myOrders')}
          </Link>
        </li>
        <li className="flex items-center whitespace-nowrap">
          <Link to="" className="text-white text-sm no-underline">
            {t('sellTicketsOnVexere')}
          </Link>
        </li>

        {/* Dropdown */}
        <li className={`relative flex items-center dropdown-container`}>
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-1 text-white text-sm cursor-pointer bg-none border-none p-0 font-inherit transition-opacity duration-200 hover:opacity-80"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            {t('becomePartner')}
            <span
              className={`inline-block text-[10px] transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            >
              ▼
            </span>
          </button>
          {isDropdownOpen && (
            <ul className="absolute top-full right-0 bg-white rounded shadow-md py-2 mt-2 min-w-[180px] z-50 animate-slideDown">
              <li>
                <Link
                  to="/partner/register"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-[#2474E5]"
                >
                  {t('partnerRegister')}
                </Link>
              </li>
              <li>
                <Link
                  to="/partner/login"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-[#2474E5]"
                >
                  {t('partnerLogin')}
                </Link>
              </li>
              <li>
                <Link
                  to="/partner/benefits"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-[#2474E5]"
                >
                  {t('partnerBenefits')}
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Language */}
        <li className="flex items-center">
          <button
            onClick={toggleLanguage}
            aria-label="Toggle language"
            className="flex items-center justify-center p-1 cursor-pointer transition duration-200 hover:opacity-80 hover:scale-110 active:scale-95 bg-none border-none"
          >
            <img
              src={currentFlag}
              alt={language === LANGUAGE.VI ? 'Vietnamese' : 'English'}
              className="w-6 h-6 object-cover rounded-sm"
            />
          </button>
        </li>

        {/* Hotline */}
        <li className="flex items-center">
          <button className="flex items-center gap-2 bg-white text-black font-bold text-sm px-4 py-2 rounded transition-all duration-200 hover:bg-gray-100 hover:-translate-y-0.5 active:translate-y-0">
            <PhoneOutlined className="text-base rotate-90" />
            {t('hotline247')}
          </button>
        </li>

        {/* Login */}
        <li className="flex items-center">
          <button
            onClick={() => setIsLoginOpen(!isLoginOpen)}
            className="flex justify-center min-w-[100px] items-center bg-white text-black font-bold text-sm px-4 py-2 rounded transition-all duration-200 hover:bg-gray-100 hover:-translate-y-0.5 active:translate-y-0"
          >
            {t('login')}
          </button>
        </li>
      </ul>

      {/* Animation keyframes for dropdown */}
      <style>
        {`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        `}
      </style>
    </div>
  );
};
