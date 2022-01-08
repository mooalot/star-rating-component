import { Component, Host, h, Prop, Element, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'star-rating',
  styleUrl: 'star-rating.scss',
  shadow: true,
})
export class StarRating {
  @Element() el: HTMLElement;
  @Prop() numStars: number = 5;
  @Prop() defaultRating: number = 3;
  @Prop() rounded: boolean = true;

  allowZero: boolean = false;

  @Event({ eventName: 'ratingChange', bubbles: true, composed: true }) ratingChange: EventEmitter;

  private rating: number = this.defaultRating;

  //set default rating
  componentDidLoad() {
    this.setDefaultRating();
  }

  setDefaultRating() {
    if (this.numStars <= 0) return console.error('numStars must be greater than 0');
    let rating = this.defaultRating;
    if (rating > this.numStars) {
      rating = this.numStars;
    }
    if (rating < 0) {
      rating = 0;
    }
    if (!this.allowZero && rating === 0)
      rating = 1;
    const stars = this.el.shadowRoot.querySelectorAll('.star');
    for (let i = 0; i < stars.length; i++) {
      if (i < rating) {
        stars[i].classList.add('active');
      } else {
        stars[i].classList.remove('active');
      }
    }
  }

  createStars() {
    const stars = [];
    if (this.numStars <= 0) return;
    for (let i = 0; i < this.numStars; i++) {
      if (this.rounded) {
        stars.push(
          <div class="star">
            <svg
              viewBox="0 0 1080 1080"
              width="1080"
              height="1080"
            >
              <path class={{ 'active': !this.allowZero && i === 0 }} d="M498.161,25.2C506.737,10.813 522.251,2 539,2C555.749,2 571.263,10.813 579.839,25.2L730.333,277.652L1016.94,342.768C1033.27,346.479 1046.44,358.51 1051.62,374.44C1056.8,390.369 1053.21,407.847 1042.17,420.449L848.584,641.59L875.219,934.286C876.737,950.967 869.367,967.215 855.816,977.06C842.266,986.905 824.535,988.894 809.14,982.296L539,866.516L268.86,982.296C253.465,988.894 235.734,986.905 222.184,977.06C208.633,967.215 201.263,950.967 202.781,934.286L229.416,641.59L35.825,420.449C24.792,407.847 21.205,390.369 26.381,374.44C31.556,358.51 44.732,346.479 61.065,342.768L347.667,277.652L498.161,25.2Z" />
            </svg>
          </div>
        );
      } else {
        stars.push(
          <div class="star">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1080"
              height="1080"
              viewBox="0 0 24 24"
            >
              <path class={{ 'active': !this.allowZero && i === 0 }} d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
            </svg>
          </div>
        );
      }
    }
    return stars;
  }

  updateStars(e: MouseEvent) {
    const stars = this.el.shadowRoot.querySelectorAll('.star');
    const startIndex = this.allowZero ? 0 : 1;
    if (this.numStars <= 0) return;
    for (let i = startIndex; i < stars.length; i++) {
      const star = stars[i];
      const starRect = star.getBoundingClientRect();
      const starCenter = {
        x: starRect.left + starRect.width / 2,
        y: starRect.top + starRect.height / 2,
      };
      const starRadius = starRect.width / 2;
      const touchRadius = starRadius;
      const touchArea = {
        left: starCenter.x - touchRadius,
        right: starCenter.x + touchRadius,
        top: starCenter.y - touchRadius,
        bottom: starCenter.y + touchRadius,
      };
      if (e.clientX > touchArea.left) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    }
  }

  onClick(e: MouseEvent) {
    this.updateStars(e);
    this.countActiveStars();
  }

  countActiveStars() {
    const stars = this.el.shadowRoot.querySelectorAll('.star');
    let activeStars = 0;
    for (let i = 0; i < stars.length; i++) {
      if (stars[i].classList.contains('active')) {
        activeStars++;
      }
    }
    this.rating = activeStars;
    this.ratingChange.emit(this.rating);
  }


  render() {
    return (
      <Host
        onclick={(e: MouseEvent) => this.onClick(e)}
      >
        <div class="rating-container">
          {this.createStars()}
        </div>
      </Host>
    );
  }

}
