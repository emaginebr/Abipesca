import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostCalendar, useSocialNetworks } from 'bazzuca-react';
import { useTranslation } from 'react-i18next';
import { ADMIN_NAMESPACE } from '../../i18n';
import { ROUTES } from '../../lib/constants';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

export function CalendarPage() {
  const navigate = useNavigate();
  const { t } = useTranslation(ADMIN_NAMESPACE);
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [selectedClientId, setSelectedClientId] = useState<string>('');
  const { clients } = useSocialNetworks();

  const monthNames = [
    t('calendar.months.january'), t('calendar.months.february'),
    t('calendar.months.march'), t('calendar.months.april'),
    t('calendar.months.may'), t('calendar.months.june'),
    t('calendar.months.july'), t('calendar.months.august'),
    t('calendar.months.september'), t('calendar.months.october'),
    t('calendar.months.november'), t('calendar.months.december'),
  ];

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleToday = () => {
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
  };

  const handlePostClick = (post: any) => {
    navigate(ROUTES.POSTS_VIEW(post.id));
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('calendar.title')}
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {t('calendar.description')}
          </p>
        </div>
      </div>

      {/* Toolbar: Month Navigation + Client Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Month Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePreviousMonth}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            aria-label={t('calendar.previousMonth')}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white min-w-[180px] text-center">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            aria-label={t('calendar.nextMonth')}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={handleToday}
            className="px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {t('calendar.today')}
          </button>
        </div>

        {/* Client Filter */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="calendar-client-filter"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('calendar.clientLabel')}
          </label>
          <select
            id="calendar-client-filter"
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            className="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">{t('calendar.allClients')}</option>
            {clients?.map((client: any) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <PostCalendar
          month={currentMonth}
          year={currentYear}
          clientId={selectedClientId || undefined}
          onPostClick={handlePostClick}
        />
      </div>
    </div>
  );
}
