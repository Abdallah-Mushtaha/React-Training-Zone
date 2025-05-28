export default function PostesCard({ poste }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{poste.title}</h5>
        <p className="card-text">{poste.body}</p>
      </div>
    </div>
  );
}
