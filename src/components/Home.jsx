import posts from "../data/data";

function Home() {
  const handleShare = (index) => {
    const postUrl = `${window.location.origin}/post/${index}`;
    navigator.clipboard.writeText(postUrl).then(() => {
      alert("Link copied to clipboard!");
    });
  };
  return (
    <>
      <div className="bg-[#0e1113] flex flex-col gap-2 justify-center items-center">
        {posts.map((post, index) => (
          <div className="inset-0 w-[500px]" key={index}>
            <div className="cursor-pointer group bg-[#0e1113] focus-within:bg-[#21272a] hover:bg-[#21272a] rounded-[16px] px-[16px] py-2xs my-2xs nd:visible">
              <h1 className="font-semibold text-[#eef1f3] m-0 text-16 xs:text-18  mb-2xs xs:mb-xs">
                {post.title}
              </h1>
              <p className="text-[#eef1f3]">{post.description}</p>
              {post.image && <img width={500} src={post.image} />}
              <div className="flex justify-end gap-1">
                <button
                  onClick={() => handleShare(index)}
                  className="bg-[#2a3226] hover:bg-[#333d42] text-white px-2 rounded-lg h-8 "
                >
                  Share
                </button>
              </div>
            </div>
            <hr className="border border-b-sm border-solid border-b-[#ffffff19]" />
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
