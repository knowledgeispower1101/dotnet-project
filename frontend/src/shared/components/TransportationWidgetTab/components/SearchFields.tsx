import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker, ConfigProvider, Row, Col, Button } from 'antd';
import type { Dayjs } from 'dayjs';
import localeVi from 'antd/locale/vi_VN';
import localeEn from 'antd/locale/en_US';

import { useTransportationSearch } from '../hooks/useTransportationSearch';
import './styles/SearchFields.css';
import { DropOffIcon, EventVex, PickupVexIcon } from '@/assets';

type UseTransportationSearchReturn = ReturnType<typeof useTransportationSearch>;

interface SearchFieldsProps {
  searchState: UseTransportationSearchReturn;
  i18nLanguage: string;
}

export const SearchFields = ({ searchState, i18nLanguage }: SearchFieldsProps) => {
  const { t } = useTranslation();
  const {
    departurePoint,
    destination,
    departureDate,
    returnDate,
    showReturnDate,
    setDeparturePoint,
    setDestination,
    setDepartureDate,
    setReturnDate,
    setShowReturnDate,
    handleSwap,
    handleSearch,
    handleRemoveReturnDate,
  } = searchState;

  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [isDepartureOpen, setIsDepartureOpen] = useState(false);
  const [isReturnOpen, setIsReturnOpen] = useState(false);

  const popularLocations = useMemo(() => ['Hà Nội', 'Quảng Ninh', 'Ninh Bình', 'Đà Nẵng', 'Sài Gòn'], []);

  const hiddenStyle = useMemo(
    () => ({
      position: 'absolute' as const,
      width: 0,
      height: 0,
      opacity: 0,
      pointerEvents: 'none' as const,
      left: '50%',
    }),
    [],
  );

  const dateFormat = 'ddd, DD/MM/YYYY';

  const handleDepartureChange = useCallback(
    (date: Dayjs | null) => {
      setDepartureDate(date);

      if (date && returnDate) {
        // If departure is same day or after return date → clear return
        if (date.isSame(returnDate, 'day') || date.isAfter(returnDate, 'day')) {
          setReturnDate(null);
          setShowReturnDate(false);
        }
      }

      setIsDepartureOpen(false);
    },
    [returnDate, setDepartureDate, setReturnDate, setShowReturnDate],
  );

  const handleReturnChange = useCallback(
    (date: Dayjs | null) => {
      if (date) {
        if (departureDate && date.isSame(departureDate, 'day')) {
          setReturnDate(null);
          setShowReturnDate(false);
        } else {
          setReturnDate(date);
          setShowReturnDate(true);
        }
      } else {
        setReturnDate(null);
        setShowReturnDate(false);
      }
      setIsReturnOpen(false);
    },
    [departureDate, setReturnDate, setShowReturnDate],
  );

  const handleRangeChange = useCallback(
    (dates: [Dayjs | null, Dayjs | null] | null) => {
      if (dates?.[0]) setDepartureDate(dates[0]);
      if (dates?.[1]) {
        setReturnDate(dates[1]);
        setShowReturnDate(true);
      } else {
        setReturnDate(null);
      }
      setIsReturnOpen(false);
    },
    [setDepartureDate, setReturnDate, setShowReturnDate],
  );

  const filteredFromLocations = useMemo(
    () => popularLocations.filter((x) => (fromQuery.trim() ? x.toLowerCase().includes(fromQuery.toLowerCase()) : true)),
    [fromQuery, popularLocations],
  );

  const filteredToLocations = useMemo(
    () => popularLocations.filter((x) => (toQuery.trim() ? x.toLowerCase().includes(toQuery.toLowerCase()) : true)),
    [toQuery, popularLocations],
  );

  const localeConfig = i18nLanguage === 'vi' ? localeVi : localeEn;

  return (
    <div style={{ padding: '16px' }}>
      <div className="transportation-search-fields">
        <div className="search-widget-interface">
          <Row className="search-widget-inner-content">
            <Col className="area-wrapper-col" span={20}>
              <Row style={{ height: '100%' }}>
                <Col span={6}>
                  <div className="from-select-wrapper">
                    <div className="select-wrapper">
                      <div className="icon-container">
                        <img src={PickupVexIcon} alt="Pickup" />
                      </div>
                      <div className="input-container ant-input jpHwBh" onFocus={() => setIsFromOpen(true)}>
                        <div className="input-section">
                          <input
                            value={fromQuery || departurePoint}
                            onChange={(e) => {
                              setFromQuery(e.target.value);
                              setIsFromOpen(true);
                            }}
                            onBlur={() => setTimeout(() => setIsFromOpen(false), 150)}
                          />
                          <label className="field-label color--light-disable">{t('startPoint')}</label>
                        </div>
                      </div>
                    </div>
                    {isFromOpen && (
                      <ul className="dropdown-menu ant-select-dropdown-menu">
                        <li className="ant-select-dropdown-menu-item-group">
                          <div className="ant-select-dropdown-menu-item-group-title">Địa điểm phổ biến</div>
                          <ul className="ant-select-dropdown-menu-item-group-list">
                            {filteredFromLocations.map((x) => (
                              <li
                                key={x}
                                className="ant-select-dropdown-menu-item"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                  setDeparturePoint(x);
                                  setFromQuery('');
                                  setIsFromOpen(false);
                                }}
                              >
                                {x}
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    )}
                  </div>
                  <div className="swap-container">
                    <div className="switch-icon-container bg-gray" onClick={handleSwap}>
                      <span className="material-symbols-outlined">swap_vert</span>
                    </div>
                  </div>
                </Col>

                {/* TO LOCATION */}
                <Col span={6}>
                  <div className="from-select-wrapper dropoff">
                    <div className="select-wrapper">
                      <div className="icon-container">
                        <img src={DropOffIcon} alt="Dropoff" />
                      </div>
                      <div className="input-container ant-input jpHwBh" onFocus={() => setIsToOpen(true)}>
                        <div className="input-section">
                          <input
                            value={toQuery || destination}
                            onChange={(e) => {
                              setToQuery(e.target.value);
                              setIsToOpen(true);
                            }}
                            onBlur={() => setTimeout(() => setIsToOpen(false), 150)}
                          />
                          <label className="field-label color--light-disable">{t('destination')}</label>
                        </div>
                      </div>
                    </div>
                    {isToOpen && (
                      <ul className="dropdown-menu ant-select-dropdown-menu">
                        <li className="ant-select-dropdown-menu-item-group">
                          <div className="ant-select-dropdown-menu-item-group-title">Địa điểm phổ biến</div>
                          <ul className="ant-select-dropdown-menu-item-group-list">
                            {filteredToLocations.map((x) => (
                              <li
                                key={x}
                                className="ant-select-dropdown-menu-item"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                  setDestination(x);
                                  setToQuery('');
                                  setIsToOpen(false);
                                }}
                              >
                                {x}
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    )}
                  </div>
                </Col>

                <Col span={6}>
                  <div className="from-select-wrapper" onClick={() => setIsDepartureOpen(true)}>
                    <div className="select-wrapper">
                      <div className="icon-container">
                        <img src={EventVex} alt="eventVex" />
                      </div>
                      <div className="input-container ant-input jpHwBh">
                        <div className="input-section">
                          <input readOnly value={departureDate?.format(dateFormat) || ''} />
                          <label className="field-label color--light-disable">{t('departureDate')}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>

                {/* RETURN DATE */}
                <Col span={6}>
                  <div
                    className="from-select-wrapper"
                    onClick={() => {
                      setShowReturnDate(true);
                      setIsReturnOpen(true);
                    }}
                  >
                    <div className="select-wrapper return-date">
                      <div className="icon-container">
                        <span style={{ color: '#2478e5' }} className="material-symbols-outlined">
                          {showReturnDate && returnDate ? 'calendar_month' : 'add'}
                        </span>
                      </div>
                      <div className="input-container ant-input jpHwBh">
                        {showReturnDate && (returnDate || departureDate) ? (
                          <div className="input-section">
                            <input readOnly value={(returnDate || departureDate)?.format(dateFormat) || ''} />
                            <label className="field-label color--light-disable">{t('returnDate')}</label>
                          </div>
                        ) : (
                          <div className="input-section return-date-no-selection">{t('addReturnDate')}</div>
                        )}
                        {showReturnDate && returnDate && (
                          <button
                            className="remove-return-date-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveReturnDate();
                            }}
                            aria-label="Remove return date"
                          >
                            <span className="material-symbols-outlined">close_small</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>

            {/* SEARCH BUTTON */}
            <Col span={4}>
              <Button className="search-button" type="primary" onClick={handleSearch}>
                {t('search')}
              </Button>
            </Col>
          </Row>

          <ConfigProvider locale={localeConfig}>
            <DatePicker
              style={hiddenStyle}
              open={isDepartureOpen}
              value={departureDate}
              onOpenChange={setIsDepartureOpen}
              onChange={handleDepartureChange}
              format={dateFormat}
              allowClear={false}
            />

            {departureDate ? (
              <DatePicker
                style={hiddenStyle}
                open={isReturnOpen}
                value={returnDate}
                disabledDate={(current) => !!departureDate && !current.isAfter(departureDate, 'day')}
                onOpenChange={setIsReturnOpen}
                onChange={handleReturnChange}
                format={dateFormat}
                allowClear={false}
              />
            ) : (
              <DatePicker.RangePicker
                style={hiddenStyle}
                open={isReturnOpen}
                value={[departureDate, returnDate]}
                onOpenChange={setIsReturnOpen}
                onChange={handleRangeChange}
                format={dateFormat}
                allowClear={false}
              />
            )}
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};
