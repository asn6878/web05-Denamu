import { useEffect, useRef } from "react";

import { Rss } from "lucide-react";

import { PostCardGrid } from "@/components/common/Card/PostCardGrid";
import { LoadingIndicator } from "@/components/common/LoadingIndicator";
import { SectionHeader } from "@/components/common/SectionHeader";

import { useInfiniteScrollQuery } from "@/hooks/useInfiniteScrollQuery";

import { posts } from "@/api/queries/posts";
import { Post } from "@/types/post";

export default function LatestSection() {
  const observerTarget = useRef<HTMLDivElement>(null);
  const { items, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteScrollQuery<Post>({
    queryKey: "latest-posts",
    fetchFn: posts.latest,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <LoadingIndicator />;

  return (
    <section className="flex flex-col p-4 min-h-[300px]">
      <SectionHeader icon={Rss} text="최신 포스트" description="최근에 작성된 포스트" iconColor="text-orange-500" />
      <div className="flex-1 mt-4 p-4 border border-dashed border-gray-500 rounded-lg">
        <PostCardGrid posts={items} />
        <div ref={observerTarget} className="h-10 flex items-center justify-center mt-4">
          {isFetchingNextPage && <LoadingIndicator />}
        </div>
      </div>
    </section>
  );
}
