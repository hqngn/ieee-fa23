/**
 * Resources Used:
 * https://stackoverflow.com/questions/54067291/next-js-loads-script-tags-but-it-doesnt-execute-them
 */

"use client";

import Image from 'next/image'
import Head from 'next/head'
import styles from './page.module.css'
import Playbutton from './Playbutton'

export default function Home() {
  
    return (
  
        <main className={styles.main}>
            
            <Head>

                <script type="text/javascript" src="./scripts/scripts.js">
                </script>
            
            </Head>

            <div>

                <Image

                    className={styles.logo}
                    src="/heartlogo.jpeg"  
                    alt="https://stock.adobe.com/images/heart-love-red-icon-with-si
                    gn-heartbeat-black-background-love-symbol-valentine-heart-of-lo
                    ve-vector-illustration/290373672"
                    width={339}
                    height={213}
                    priority
                
                />

            </div>

            <div className={styles.formcontainer}>
            
                <form id="urlForm">
            
                <label htmlFor="urlInput">
                    
                    Enter the link for your Spotify Playlist | Hold the sensor for 
                    10 seconds | Press submit while holding
                    
                </label>
            
                <br></br>

                <input

                    type="url" 
                    id="urlInput" 
                    placeholder="ex: open.spotify.com/playlist/asdf"
                    style={{width: "863px", height: "32px"}} 
                    required
                
                ></input>
            
                <Playbutton id="songs" className={styles.center}/>
            
                </form>

                <br></br>
            
            </div>

        </main>

    )

}
