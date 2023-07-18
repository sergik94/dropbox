import './EmptyRoot.scss';

export const EmptyRoot = () => {
  return (
    <section className="empty-root">
      <p className="empty-root__text">
        Your root folder is empty. Add folder from your device to root folder:
      </p>
      <ol className="empty-root__list">
        <li className="empty-root__item">
          Go to{' '}
          <a
            className="empty-root__link"
            href="https://www.dropbox.com/home/"
            target="_blank"
            rel="noreferrer"
          >
            your working place
          </a>{' '}
          and click on the folder <strong>Applications</strong>
        </li>
        <li className="empty-root__item">
          Choose the folder which you created earlier
        </li>
        <li className="empty-root__item">Upload the folder from your device</li>
        <li className="empty-root__item">Reload the current application.</li>
      </ol>
    </section>
  );
};
