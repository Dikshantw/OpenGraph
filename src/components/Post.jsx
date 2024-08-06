import { useEffect } from "react";
import { useParams } from "react-router-dom";
import posts from "../posts/data";

function Post() {
  const { index } = useParams();
  const post = posts[index];

  useEffect(() => {
    const metaOgImage = document.querySelector('meta[property="og:image"]');
    if (metaOgImage) {
      metaOgImage.setAttribute("content", generateOgImageUrl(post));
    } else {
      const newMetaOgImage = document.createElement("meta");
      newMetaOgImage.setAttribute("property", "og:image");
      newMetaOgImage.setAttribute("content", generateOgImageUrl(post));
      document.head.appendChild(newMetaOgImage);
    }
  }, [post]);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="bg-[#0e1113] flex flex-col gap-2 justify-center items-center">
      <div className="inset-0 w-[500px]">
        <div className="cursor-pointer group bg-[#0e1113] focus-within:bg-[#21272a] hover:bg-[#21272a] rounded-[16px] px-[16px] py-2xs my-2xs nd:visible">
          <h1 className="font-semibold text-[#eef1f3] m-0 text-16 xs:text-18  mb-2xs xs:mb-xs">
            {post.title}
          </h1>
          <p className="text-[#eef1f3]">{post.description}</p>
          {post.image && <img width={500} src={post.image} />}
        </div>
      </div>
    </div>
  );
}

function generateOgImageUrl(post) {
  const { title, description, image } = post;
  const params = new URLSearchParams({
    title,
    description,
    imageUrl: image || "",
  });

  return `${window.location.origin.replace(
    /:\d+$/,
    ":3001"
  )}/generate-image?${params.toString()}`;
}

export default Post;
