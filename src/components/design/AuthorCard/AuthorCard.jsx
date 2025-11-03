import "@/components/design/AuthorCard/AuthorCard.css";

export const AuthorCard = ({ author }) => {
  if (!author) return null;

  return (
    <div className="author-card">
      <div className="author-card-header">About the Author</div>
      <div className="author-card-content">
        <img
          src={author.avatar}
          alt={`${author.firstName} ${author.lastName}`}
          className="author-avatar"
        />
        <h3 className="author-name">
          {author.firstName} {author.lastName}
        </h3>
        <p className="author-bio">{author.bio}</p>
        {author.social && (
          <div className="author-social">
            {author.social.twitter && (
              <a
                href={author.social.twitter}
                className="author-social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            )}
            {author.social.linkedin && (
              <a
                href={author.social.linkedin}
                className="author-social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorCard;
// Geen wijzigingen nodig - externe links gebruiken correct <a> tags
