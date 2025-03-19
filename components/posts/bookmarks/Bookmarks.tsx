import Bookmark from "./Bookmark";

export default function Bookmarks({
  bookmarks,
}: {
  bookmarks: BookmarksProps[];
}) {
  return (
    <div className="p-6">
      <ul>
        {bookmarks.length === 0 ? (
          <li className="mb-5">No bookmarks added yet.</li>
        ) : (
          bookmarks.map((bookmark) => (
            <li
              className="mb-5 border-gray-300/40 not-last-of-type:border-b-2 not-last-of-type:pb-5"
              key={bookmark.id}
            >
              <Bookmark post={bookmark.post} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
