import { Permanent_Marker, Yomogi } from "next/font/google";
import Image from "next/image";
import robotlabotTitle from "../png/Robotlabot/robolabtitle.png";
import robotlabotGif from "../png/Robotlabot/Robotlabotgif.gif";
import robotlabotStill1 from "../png/Robotlabot/robolab1.png";
import robotlabotStill2 from "../png/Robotlabot/robolab2.png";
import magiTitle from "../png/Magicard/magititle.png";
import magi1 from "../png/Magicard/magi1.png";
import magi3 from "../png/Magicard/magi3.png";
import magiGif from "../png/Magicard/Magif.gif";
import emoTitle from "../png/EMO/emotitle.png";
import emo1 from "../png/EMO/emo1.png";
import emo2 from "../png/EMO/emo2.png";
import emoGif from "../png/EMO/emogif.gif";

const doodleFont = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
});

const japaneseDoodleFont = Yomogi({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={`${japaneseDoodleFont.className} relative z-10 min-h-screen text-orange-400`}>
      <section className="min-h-screen flex flex-col items-stretch justify-center px-6">
        <div className={`${doodleFont.className} flex flex-col w-full max-w-7xl mx-auto font-extrabold tracking-tight leading-[0.9] mb-6`}>
          <span className="intro-fade-up hero-outline block w-full text-left text-[clamp(8rem,30vw,20rem)] text-orange-400">Hello!</span>
          <span className="intro-fade-up intro-fade-up-delay hero-outline block w-full text-right text-[clamp(3.5rem,16vw,12rem)] text-orange-400">I&apos;m Kota Muro</span>
        </div>
        <div aria-hidden="true" />
      </section>

      <section className="px-8 pb-16">
        <h2 className={`${japaneseDoodleFont.className} hero-outline text-5xl sm:text-7xl font-extrabold mb-6 text-center text-orange-400`}>
          <span className="title-wobble inline-block">つくったもの</span>
        </h2>
        <div className="mt-8 border-t border-gray-400/40 pt-10">
      
          <div className="flex gap-8 items-start px-8">
            {/* 左側: PNG画像（ロゴ） */}
            {/* z-10 でデフォルト前面。ホバー時は z-20 でさらに前面に。 */}
            <div className="relative z-10 flex-shrink-0 inline-block transition-transform duration-300 ease-out hover:scale-105 cursor-pointer hover:z-20">
              <div
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-orange-400"
                aria-hidden="true"
              />
              <div className="absolute inset-0 rounded-3xl bg-white" aria-hidden="true" />
              <Image
                src={robotlabotTitle}
                alt="ロボットラボット"
                width={512}
                height={512}
                className="relative block w-150 h-auto"
                priority
              />
            </div>
            
            {/* 右側: Aboutテキスト */}
            <div className="relative z-0 flex-1 -ml-12 mt-6">
              <div className="absolute -top-8 left-20 z-10">
                <span className="hero-outline about-pop text-4xl font-bold">About</span>
              </div>
              <div className="bg-white rounded-3xl border-2 border-white/80 p-8 pt-10 pl-16 text-3xl">
              <p className="leading-relaxed mb-4">
                アイテムをドラック&ドロップし、ゴールを目指すパズルゲーム。
                </p>
              <p className="leading-relaxed mb-4">
                初めてのゲーム制作で、5人チームによる共同開発作品。
                </p>
                <p className="leading-relaxed mb-4">
                原案、プログラム、UI、タイトルロゴ（左の画像）を担当。
              </p>
              <p className="leading-relaxed">
                2022年夏制作。Unity使用。すべてにおいて、生成AI不使用。
              </p>
              </div>
            </div>
          </div>

          <div className="mt-10 px-8">
            {/* ▼ スクショとGIFの親要素。gap-6を削除しました ▼ */}
            <div className="flex items-start">
              
              {/* スクショ1（最背面） */}
              {/* ホバー時に z-10 で前面に。 */}
              <div className="relative inline-block flex-1 transition-transform duration-300 ease-out hover:scale-105 cursor-pointer hover:z-10">
                <div
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-orange-400"
                  aria-hidden="true"
                />
                <div className="relative rounded-3xl bg-white p-2">
                  <Image
                    src={robotlabotStill1}
                    alt="ロボットラボット スクショ1"
                    width={800}
                    height={800}
                    className="block w-full h-auto rounded-2xl"
                  />
                </div>
              </div>
              
              {/* ▼ スクショ2 ▼ */}
              {/* ホバー時に z-10 で前面に。ml-[-4rem] で左に重ねました。 */}
              <div className="relative inline-block flex-1 mt-16 transition-transform duration-300 ease-out hover:scale-105 cursor-pointer hover:z-10 ml-[-4rem]">
                <div
                    className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-orange-400"
                    aria-hidden="true"
                />
                <div className="relative rounded-3xl bg-white p-2">
                  <Image
                    src={robotlabotStill2}
                    alt="ロボットラボット スクショ2"
                    width={800}
                    height={800}
                    className="block w-full h-auto rounded-2xl"
                  />
                </div>
              </div>

              {/* ▼ GIF（最前面） ▼ */}
              {/* ホバー時に z-10 で前面に。ml-[-4rem] で左に重ねました。 */}
              <div className="relative inline-block flex-1 transition-transform duration-300 ease-out hover:scale-105 cursor-pointer hover:z-10 ml-[-4rem]">
                <div
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-orange-400"
                  aria-hidden="true"
                />
                <div className="relative rounded-3xl bg-white p-2">
                  <Image
                    src={robotlabotGif}
                    alt="ロボットラボット GIF"
                    width={800}
                    height={800}
                    className="block w-full h-auto rounded-2xl"
                  />
                </div>
              </div>
              {/* ▲ GIF ここまで ▲ */}

            </div>
          </div>

            {/* Robotlabot: More */}
            <div className="px-8 mt-8">
              <div className="bg-white rounded-3xl border-2 border-white/80 p-6 text-3xl">
                <h4 className="hero-outline about-pop text-4xl font-bold mb-3">More</h4>
                <p className="leading-relaxed">
                学園祭での展示を念頭に、約2ヶ月の期間で開発。初めてのゲーム制作で、Unityも触ったことがない状態からのスタートだった。
                </p>
                <p className="leading-relaxed">
                右も左もわからない状態な上、プログラマが私一人ということもあり大変な苦労をした。ギミックやステージをチーム全体で試行錯誤しながら、なんとか期間内に完成できた。
                </p>
                <p className="leading-relaxed">
                学園祭での展示ということで、直感的なわかりやすさ、手に取ってもらいやすさを重視した。
              </p>
              <p className="leading-relaxed"> 
                特に、多数のゲームが並ぶ中、短い時間で遊ぶゲームとして選ばれるには『第一印象』が重要だと考え、他チームが用意していなかった専用のタイトルロゴを制作した。一番クオリティが高そうだと感じさせる工夫をした結果、多くの来場者の目を引き、学園祭で最も人気なゲームに選んでもらった。
              </p>
              </div>
            </div>

            <div className="mt-16 border-t border-gray-400/40 pt-10">
              <div className="flex gap-8 items-start px-8">
                <div className="relative z-10 flex-shrink-0 inline-block transition-transform duration-300 ease-out hover:scale-105 cursor-pointer hover:z-20">
                  <div
                    className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-orange-400"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 rounded-3xl bg-white" aria-hidden="true" />
                  <Image
                    src={magiTitle}
                    alt="マジカード"
                    width={512}
                    height={512}
                    className="relative block w-150 h-auto rounded-3xl"
                    priority
                  />
                </div>

                <div className="relative z-0 flex-1 -ml-12 mt-6">
                  <div className="absolute -top-8 left-20 z-10">
                    <span className="hero-outline about-pop text-4xl font-bold">About</span>
                  </div>
                  <div className="bg-white rounded-3xl border-2 border-white/80 p-8 pt-10 pl-16 text-3xl">
                    <p className="leading-relaxed mb-4">
                      敵を倒してカードを集め、ボスに挑むハクスラ系アクションゲーム。デッキからランダムに引かれるカードを駆使して戦う。
                    </p>
                    <p className="leading-relaxed mb-4">
                      3人チームでの共同開発作品。プランナー、プログラム、UIを担当。
                    </p>
                    <p className="leading-relaxed">
                      2023年春制作。Unity使用。すべてにおいて、生成AI不使用。
                      
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 px-8">
                <div className="flex items-start">
                  <div className="relative inline-block flex-1 transition-transform duration-300 ease-out hover:scale-105 cursor-pointer hover:z-10">
                    <div
                      className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-orange-400"
                      aria-hidden="true"
                    />
                    <div className="relative rounded-3xl bg-white p-2">
                      <Image
                        src={magi1}
                        alt="マジカード スクショ1"
                        width={800}
                        height={800}
                        className="block w-full h-auto rounded-2xl"
                      />
                    </div>
                  </div>

                  <div className="relative inline-block flex-1 mt-16 transition-transform duration-300 ease-out hover:scale-105 cursor-pointer hover:z-10 ml-[-4rem]">
                    <div
                      className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-orange-400"
                      aria-hidden="true"
                    />
                    <div className="relative rounded-3xl bg-white p-2">
                      <Image
                        src={magi3}
                        alt="マジカード スクショ2"
                        width={800}
                        height={800}
                        className="block w-full h-auto rounded-2xl"
                      />
                    </div>
                  </div>

                  <div className="relative inline-block flex-1 transition-transform duration-300 ease-out hover:scale-105 cursor-pointer hover:z-10 ml-[-4rem]">
                    <div
                      className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-orange-400"
                      aria-hidden="true"
                    />
                    <div className="relative rounded-3xl bg-white p-2">
                      <Image
                        src={magiGif}
                        alt="マジカード GIF"
                        width={800}
                        height={800}
                        className="block w-full h-auto rounded-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Magicard: More */}
              <div className="px-8 mt-8">
                <div className="bg-white rounded-3xl border-2 border-white/80 p-6 text-3xl">
                  <h4 className="hero-outline about-pop text-4xl font-bold mb-3">More</h4>
                  <p className="leading-relaxed mb-3">
                    デッキ構築系カードゲームの持つドローのハラハラ感をアクションゲームに落とし込んでみたいと思い、制作した作品。
                  </p>
                  <p className="leading-relaxed">
                    とりあえず作ってみたいものを規模間や労力を考えずにやみくもに作った。ただ、２か月という開発期間は決まっていたので、まったく時間が足りず、ハクスラのもつやりこみの面白さも取り入れたカードゲームのハラハラ感もアクション性もどれも中途半端なものになってしまったと感じる。
                  </p>
                  <p className="leading-relaxed">
                    ゲーム制作の難しさと、計画を立て、それの面白みについて精査することの重要性を痛感した作品。
                  </p>
                </div>
              </div>

              <div className="mt-16 border-t border-gray-400/40 pt-10">
                <div className="flex gap-8 items-start px-8">
                  <div className="relative z-10 flex-shrink-0 inline-block transition-transform duration-300 ease-out hover:scale-105 cursor-pointer hover:z-20">
                    <div
                      className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-orange-400"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 rounded-3xl bg-white" aria-hidden="true" />
                    <Image
                      src={emoTitle}
                      alt="EMO"
                      width={512}
                      height={512}
                      className="relative block w-150 h-auto rounded-3xl"
                      priority
                    />
                  </div>

                  <div className="relative z-0 flex-1 -ml-12 mt-6">
                    <div className="absolute -top-8 left-20 z-10">
                      <span className="hero-outline about-pop text-4xl font-bold">About</span>
                    </div>
                    <div className="bg-white rounded-3xl border-2 border-white/80 p-8 pt-10 pl-16 text-3xl">
                      <p className="leading-relaxed mb-4">
                        なぞって道を切り開く、空気感重視のアクションゲーム。
                      </p>
                      <p className="leading-relaxed mb-4">
                        4人チームでの共同開発作品。プランナー、プログラム、UIを担当。
                      </p>
                      <p className="leading-relaxed">
                        2023年夏制作。Unity使用。すべてにおいて、生成AI不使用。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 px-8">
                  <div className="flex items-start">
                    <div className="relative inline-block flex-1 transition-transform duration-300 ease-out hover:scale-105 cursor-pointer hover:z-10">
                      <div
                        className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-orange-400"
                        aria-hidden="true"
                      />
                      <div className="relative rounded-3xl bg-white p-2">
                        <Image
                          src={emo1}
                          alt="EMO スクショ1"
                          width={800}
                          height={800}
                          className="block w-full h-auto rounded-2xl"
                        />
                      </div>
                    </div>

                    <div className="relative inline-block flex-1 mt-16 transition-transform duration-300 ease-out hover:scale-105 cursor-pointer hover:z-10 ml-[-4rem]">
                      <div
                        className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-orange-400"
                        aria-hidden="true"
                      />
                      <div className="relative rounded-3xl bg-white p-2">
                        <Image
                          src={emo2}
                          alt="EMO スクショ2"
                          width={800}
                          height={800}
                          className="block w-full h-auto rounded-2xl"
                        />
                      </div>
                    </div>

                    <div className="relative inline-block flex-1 transition-transform duration-300 ease-out hover:scale-105 cursor-pointer hover:z-10 ml-[-4rem]">
                      <div
                        className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-orange-400"
                        aria-hidden="true"
                      />
                      <div className="relative rounded-3xl bg-white p-2">
                        <Image
                          src={emoGif}
                          alt="EMO GIF"
                          width={800}
                          height={800}
                          className="block w-full h-auto rounded-2xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-8 mt-8">
                  <div className="bg-white rounded-3xl border-2 border-white/80 p-6 text-3xl">
                    <h4 className="hero-outline about-pop text-4xl font-bold mb-3">More</h4>
                    <p className="leading-relaxed mb-3">
                      自分以外のチームメンバーが全員新入生で、スケジュール管理や、各メンバーのモチベの維持など、チームの管理で苦労した。
                    </p>
                    <p className="leading-relaxed">
                     グループでの議論になかなか参加してくれないメンバーとも個人間でコミュニケーションを取り、志向ややりたいことのすり合わせを行い、なるべく楽しく作ってもらえることを心掛け、完成させることができた。
                     
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>
    </main>
  );
}