import info from '../assets/images/info.svg';
export default function InfoText({ title, text }) {
  return (
    <div className="col-md-12 ps-4 mt-3">
      <p className="position-relative" style={{ paddingLeft: '2rem' }}>
        <img
          src={info}
          alt="info"
          className="position-absolute"
          style={{ left: '0rem' }}
        />
        <b>{title}</b>&nbsp;{text}
      </p>
    </div>
  );
}