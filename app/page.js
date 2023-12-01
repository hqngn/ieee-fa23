import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/heartlogo.jpg"
          alt="Heart Logo"
          priority
        />
      </div>

    </main>
  )
}
