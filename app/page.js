import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.center}>
        <Image
          //className={styles.logo}
          src="/heartlogo.jpg"
          alt="Heart Logo"
          width={459}
          height={288}
          priority
        />
      </div>
      <form id="urlForm">
          <label for="urlInput">URL:</label>
          <input type="url" id="urlInput" placeholder="Enter the link for your Spotify Playlist!" required></input>

          <button type="button" onClick="submitUrl()">Submit</button>
          
        </form>


    </main>
  )
}
