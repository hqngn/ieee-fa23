import styles from '../page.module.css'

export default function Home() {
    return (
        <main className={styles.main}>
            <button type="button" onClick="goBack()">Back</button>
        </main>
      )
    }