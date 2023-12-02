import styles from '../page.module.css'

export default function Home() {
    return (
        <main className={styles.backbutton}>
            <button type="button" onClick="goBack()">Back</button>
        </main>
      )
    }