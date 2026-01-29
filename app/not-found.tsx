import { Link } from '@/i18n/config'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function NotFound() {
  const t = useTranslations('Error')

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <h1 className='text-6xl font-bold'>404</h1>
      <Image
        src='/images/rocket-crashed.svg'
        alt='404'
        width={400}
        height={400}
        className='pointer-events-none mt-6 mb-5 dark:invert'
      />
      <p className='px-4 text-center text-2xl font-medium text-balance'>
        {t('pageNotFound')}{' '}
        <Link
          href='/'
          className='underline underline-offset-4 hover:text-blue-500'
        >
          {t('backToHomepage')}
        </Link>
        .
      </p>
    </div>
  )
}
