

export default class UserInfo {
  setUserInfo(profile, container) {
    const nameInput = container.querySelector('form').name;
    const jobInput = container.querySelector('form').job;
    const name = profile.querySelector('.user-info__name');
    const job = profile.querySelector('.user-info__job');

    nameInput.value = name.textContent;
    jobInput.value = job.textContent;

  }
  updateUserInfo(profile, container) {
    const nameInput = container.querySelector('form').name;
    const jobInput = container.querySelector('form').job;
    const name = profile.querySelector('.user-info__name');
    const job = profile.querySelector('.user-info__job');

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
  }
}