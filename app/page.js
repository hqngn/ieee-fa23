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
      <div class="formcontainer">
        <form id="urlForm">
            <label for="urlInput">Enter the link for your Spotify Playlist!:</label>
            <input type="url" id="urlInput" placeholder="ex: open.spotify.com/playlist/asdf" required></input>

            <button type="button" onClick="submitUrl()">Submit</button>
            
          </form>
        </div>


    </main>
  )
}
