import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function RootPage() {
  const cookieStore = await cookies();
  const savedLang = cookieStore.get('ashraf_lang')?.value;
  const targetLocale = (savedLang && ['uz', 'en', 'ru', 'tr'].includes(savedLang))
    ? savedLang
    : 'uz';

  redirect(`/${targetLocale}`);
}
