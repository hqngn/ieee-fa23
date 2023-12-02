import Image from 'next/image'
import Head from 'next/head'
import styles from './page.module.css'
import Playbutton from './Playbutton.js'

export default function Home() {
  return (
    <main className={styles.main}>

      <Head>

        <script type="text/javascript" src="./scripts/scripts.js"></script>

      </Head>

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
      <div className={styles.formcontainer}>
        <form id="urlForm">
            <label htmlFor="urlInput">Enter the link for your Spotify Playlist!:</label>
            <br>
            </br>
            <input type="url" id="urlInput" placeholder="ex: open.spotify.com/playlist/asdf" required></input>

            <Playbutton />
            
          </form>
        </div>


    </main>
  )
}
