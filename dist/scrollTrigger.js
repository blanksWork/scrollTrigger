/**
 * scrollTrigger 1.0.0
 *
 * Copyright 2021 Blanks WORK
 *
 * Released under the MIT License
 *
 * Released on: October 20, 2021
 */
class scrollTrigger{
  constructor(settings){
    this.$initSettings = {
      triggerClass:'scroll-trigger',
      scrolledClass:'is-scrolled',
      syncAttr:'data-sync',
      delayAttr:'data-delay',
      PositionBaseY:'top',
      PositionY:'50%',
      PositionBaseX:'left',
      PositionX:'0%'
    }
    this._setSetting(settings,this.$initSettings);
    this.triggerY = this._convertPosition(this.PositionY);
    this.triggerX = this._convertPosition(this.PositionX);
    this._setMain();
  }

  _setSetting(userSets,initSets){
    if( userSets !== undefined && userSets !== null ){
      for( let attr in initSets){
        if( typeof initSets[attr] === "object" ){

        }else{
          if( userSets[attr] === undefined ){
            this[attr] = initSets[attr];
          }else{
            this[attr] = userSets[attr];
          }
        }
      }
    }else{
      for( let attr in initSets ){
        this[attr] = initSets[attr];
      }
    }
  }

  _setMain(){
    const triggers = document.querySelectorAll(`.${this.triggerClass}`);
    window.addEventListener('scroll',()=>{
      triggers.forEach(trigger=>{
        this._main(trigger);
      });
    });
    window.addEventListener('load',()=>{
      triggers.forEach(trigger=>{
        this._main(trigger);
      });
    });
  }

  _main(trigger){
    if( !trigger.classList.contains(this.scrolledClass) ){
      const Rect = trigger.getBoundingClientRect();
      if( this._isReachX(Rect.left) || this._isReachY(Rect.top)){
        const delay = Number(trigger.getAttribute(this.delayAttr));
        if( delay !== undefined && delay !== null && delay !== '' && delay !== NaN ){
          setTimeout(()=>{
            trigger.classList.add(this.scrolledClass);
          },delay);
        }else{
          trigger.classList.add(this.scrolledClass);
        }
        const syncId = trigger.getAttribute(this.syncAttr);
        if( syncId !== undefined && syncId !== null && syncId !== ''){
          this._addClassSyncItems(syncId);
        }
      }
    }
  }

  _addClassSyncItems(syncId){
    const syncItems = document.querySelectorAll(`[${this.syncAttr}="${syncId}"]`);
    if(syncItems.length){
      syncItems.forEach(item=>{
        const delay = Number(item.getAttribute(this.delayAttr));
        if( delay !== undefined && delay !== null && delay !== '' && delay !== NaN ){
          setTimeout(()=>{
            item.classList.add(this.scrolledClass);
          },delay);
        }else{
          item.classList.add(this.scrolledClass);
        }
      });
    }
  }

  _convertPosition(position){
    if( position.endsWith('%') ){
      const p = position.slice(0,-1);
      return Number(p)*0.01;
    }else if(position.endsWith('px')){
      const p = position.slice(0,-2);
      return Number(p);
    }else{
      return 0.5;
    }
  }

  _isReachX(left){
    const reachX = ( this.triggerX > 1 )?this.triggerX:(this.PositionBaseX === 'bottom')?window.innerWidth*(1 - this.triggerX):window.innerWidth*this.triggerX;
    if( left < reachX ){
      return true;
    }else{
      return false;
    }
  }

  _isReachY(top){
    const reachY = ( this.triggerY > 1 )?this.triggerY:(this.PositionBaseY === 'bottom')?window.innerHeight*(1 - this.triggerY):window.innerHeight*this.triggerY;
    if( top < reachY ){
      return true;
    }else{
      return false;
    }
  }

}