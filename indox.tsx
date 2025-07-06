import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { LibreLingo } from "@librelingo/librelingo-react";

/* === サカルティ語 コース全体情報 === */

const courseInfo = {
  courseName: "サカルティ語入門",
  sourceLanguage: "ja",
  targetLanguage: "sakarti",
};

/* === Unit1 データ === */

const unit1 = {
  concepts: [
    "これは",
    "これが",
    "水",
    "コーヒー",
    "サンドイッチ",
    "ください",
    "人",
    "友達",
    "名前",
    "はい",
    "いいえ",
  ],
  newWords: [
    { shus: "これが" },
    { wesse: "水" },
    { kaffe: "コーヒー" },
    { madamt: "ていいんさん" },
    { zucke: "砂糖" },
    { viter: "ください" },
    { brettis: "サンドイッチ" },
    { persitt: "人" },
    { frien: "友達" },
    { enash: "名前" },
    { kif: "はい" },
    { ne: "いいえ" },
  ],
  phrases: [
    { ja: "これは水です", sakarti: "shus wesse" },
    { ja: "コーヒーください", sakarti: "kaffe viter" },
    { ja: "サンドイッチください", sakarti: "brettis viter" },
    { ja: "これはサンドイッチです", sakarti: "shus brettis" },
    { ja: "あなたは人です", sakarti: "shus persitt" },
    { ja: "これは友達です", sakarti: "shus frien" },
    { ja: "名前はエナシュです", sakarti: "enash shus" },
    { ja: "はい", sakarti: "kif" },
    { ja: "いいえ", sakarti: "ne" },
  ],
};

/* === 将来拡張用 Unit2 データ例 === */

// const unit2 = {
//   concepts: [
//     "ありがとう",
//     "すみません",
//     "どこ",
//     "店",
//     "駅",
//     "トイレ",
//   ],
//   newWords: [
//     { danks: "ありがとう" },
//     { eksuz: "すみません" },
//     { woher: "どこ" },
//     { shopa: "店" },
//     { stasjon: "駅" },
//     { toilett: "トイレ" },
//   ],
//   phrases: [
//     { ja: "ありがとう", sakarti: "danks" },
//     { ja: "すみません", sakarti: "eksuz" },
//     { ja: "トイレはどこですか", sakarti: "woher toilett?" },
//   ],
// };

/* === TTS機能 === */

const useTTS = () => {
  const speak = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "tr-TR"; // トルコ語風（サカルティ語用）
      window.speechSynthesis.speak(utterance);
    } else {
      alert("このブラウザは音声合成に対応していません");
    }
  };
  return { speak };
};

/* === メインコンポーネント === */

function SakartiCourse() {
  const [current, setCurrent] = useState(0);
  const { speak } = useTTS();
  const phrase = unit1.phrases[current];

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", padding: 20 }}>
      <h1>{courseInfo.courseName} - Unit 1</h1>
      <h2>{phrase.ja}</h2>
      <div
        style={{
          fontSize: "1.2em",
          color: "#444",
          marginBottom: 20,
          fontWeight: "bold",
        }}
      >
        {phrase.sakarti}
      </div>

      <button
        onClick={() => speak(phrase.sakarti)}
        style={{
          padding: "10px 20px",
          marginRight: 10,
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        リスニング再生
      </button>

      <button
        onClick={() => setCurrent((current + 1) % unit1.phrases.length)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        次へ
      </button>

      <hr style={{ margin: "30px 0" }} />

      <LibreLingo
        courseName={`${courseInfo.courseName} - Unit 1`}
        sourceLanguage={courseInfo.sourceLanguage}
        targetLanguage={courseInfo.targetLanguage}
        data={{
          concepts: unit1.concepts,
          newWords: unit1.newWords,
          phrases: unit1.phrases,
        }}
      />
    </div>
  );
}

/* === React起動 === */

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<SakartiCourse />);
