export default function (target, index = null) {
  let el = null
  if (index) {
    el = document.querySelector(target).children[index]
  } else {
    el = document.querySelector(target)
  }
  el.scrollIntoView({
    behavior: 'smooth',
    inline: 'center',
    block: 'center'
  })
}