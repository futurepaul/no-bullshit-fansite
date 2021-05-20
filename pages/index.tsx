import Head from 'next/head'

export async function getStaticProps() {
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : process.env.PRODUCTION_URL;

  const response = await fetch(url + "/api/feed");

  if (!response.ok) {
    return {
      props: {
        posts: [],
      },
      revalidate: 10
    }
  }

  const posts = await response.json();

  return {
    props: {
      posts,
    },
    revalidate: 10
  }
}

interface IPost {
  title: string;
  link: string;
  content: string;
  imgUrl: string;
  date: string;
}

function Post({ post }: { post: IPost }) {
  const { imgUrl, title, link, content, date } = post;

  return (
    <div className="p-6 my-4 bg-white flex flex-col max-w-2xl md:w-full transition-shadow duration-500 shadow hover:shadow-lg">
      <h2>{post.title}</h2>
      <p>{date}</p>
      {imgUrl && <div className="flex justify-center">
        <img src={imgUrl} alt={title} />
      </div>}
      <div className="ml-4 my-4 max-w-2xl"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="flex justify-end"><a className="text-black underline" href={link}>DISCUSS</a></div>
    </div>
  )
}

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>NO BULLSHIT BITCOIN</title>
        <meta name="description" content="An unofficial No Bullshit Bitcoin web view" />
        <link rel="alternate" type="application/rss+xml" title="RSS" href="https://rss.app/feeds/a7pA7KDznTPqIyqR.xml" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#FCE389" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#FCE389" />
      </Head>

      <main className="p-6">
        <div className="flex justify-center">
          <img src="/bs_logo.png" alt="No Bullshit Bitcoin" width={320} height={264} />
        </div>
        <div className="flex flex-col items-center">
          {posts.map(post => {
            return (
              <Post key={post.guid} post={post} />

            )
          })
          }
        </div>

      </main>

      <footer className="pb-12">
        <div className="flex flex-col md:items-center px-6">
          <p><b>NO BULLSHIT BITCOIN IS A BITCOIN NEWS DESK WITHOUT ADS OR PAYWALLS</b></p>
          <p>Telegram: <a href="https://t.me/s/nobullshitbitcoin">https://t.me/s/nobullshitbitcoin</a></p>
          <p>RSS: <a href="https://rss.app/feeds/a7pA7KDznTPqIyqR.xml">https://rss.app/feeds/a7pA7KDznTPqIyqR.xml</a></p>
          <p>Twitter: <a href="https://twitter.com/nobsbitcoin/">https://twitter.com/nobsbitcoin/</a></p>
          <p>PGP: 9A5A F5CC 46E8 38A6 A451</p>
          <p>
            Donate: <a href="https://tippin.me/@nobsbitcoin">https://tippin.me/@nobsbitcoin</a>
          </p>
          <p />
          <p />
          <p><b>THIS WEB VERSION IS AN UNOFFICIAL FAN CREATION</b></p>
          <p>Source: <a href="https://github.com/futurepaul/no-bullshit-fansite">https://github.com/futurepaul/no-bullshit-fansite</a></p>
        </div>

      </footer>
    </>
  )
}
