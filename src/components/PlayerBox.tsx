import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import colors from "./colors";
import WebTorrent from "webtorrent";
import { AppContext } from "../App";

type ProgressBarType = {
  progress: number;
};

const Container = styled.div`
  background-color: ${colors.background2};
  height: 480px;
  width: 100%;
  box-shadow: inset 0px -4px 24px -5px rgba(0, 0, 0, 0.75);
  transition: all 0.5s ease-in;
`;

const ProgressBar = styled.div<ProgressBarType>`
  color: #394040;
  font-size: 15px;
  text-align: center;
  box-sizing: border-box;
  height: 5px;
  background-color: #35b44f;
  transition: width 0.4s ease-in-out;
  display: block;
  width: ${({ progress }) => progress}%;
`;

const Video = styled.video`
  height: 100%;
  width: 100%;
  border: none;
  box-shadow: 0px 0px 24px -5px rgba(0, 0, 0, 0.75);

  :focus {
    outline: none;
  }
`;

const PlayerBox: React.FC = () => {
  const ctx = useContext(AppContext);

  const [torrentProgress, setTorrentProgress] = useState(0);
  const [torrentInfos, setTorrentInfos] = useState(
    {} as {
      torrentInfoHash: string;
      torrentMagnetURI: string;
      torrentName: string;
      torrentFiles: string[];
    }
  );
  const [mp4File, setMp4File] = useState(null);

  useEffect(() => {
    var client = new WebTorrent();

    client.on("error", (err: { message: string }) => {
      console.log(ctx.movie);
      console.error(err);
      console.log("[+] Webtorrent error: " + err.message);
    });

    console.log(ctx.movie);

    client.add(
      ctx.movie,
      (torrent: {
        progress: number;
        on: (arg0: string, arg1: () => void) => void;
        infoHash: any;
        magnetURI: any;
        name: any;
        files: any;
      }) => {
        // const interval = setInterval(() => {
        //   // console.log('[+] Progress: ' + (torrent.progress * 100).toFixed(1) + '%')
        //   if (mp4File) setTorrentProgress(torrent.progress * 100);
        // }, 5000);

        torrent.on("done", () => {
          console.log("Progress: 100%");
          // clearInterval(interval);
        });

        document.title = `${torrent.name} SIONV`;

        setTorrentInfos({
          torrentInfoHash: torrent.infoHash,
          torrentMagnetURI: torrent.magnetURI,
          torrentName: torrent.name,
          torrentFiles: torrent.files,
        });

        var mp4File = torrent.files.find(function (file: { name: string }) {
          console.log(file);
          return file.name.endsWith(".mp4");
        });

        console.log(mp4File.path);

        setMp4File(mp4File.path);

        var file = torrent.files.find(function (file) {
          return file.name.toLowerCase().endsWith(".mp4");
        });

        file.renderTo("#player");
      }
    );
  }, [ctx.movie]);

  return (
    <Container>
      <ProgressBar progress={torrentProgress} />
      <Video
        id="player"
        autoPlay
        controls
        preload="auto"
        onProgress={(e) =>
          // tslint-ignore
          setTorrentProgress(
            ((e.target as any).currentTime * 100) / (e.target as any).duration
          )
        }
      />

      {/* <h1>{torrentInfos.torrentName}</h1>
        <p>
          <b>Torrent Info Hash: </b>
          {torrentInfos.torrentInfoHash}
        </p>
        <p>
          <b>Torrent Progress: </b>
          {torrentProgress}
        </p> */}
    </Container>
  );
};

export default PlayerBox;
