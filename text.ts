const $ = (s: string) => document.querySelector<HTMLElement>(s)

if ($('.text')!.getClientRects().length <= 3) {
  $('.more')!.style.display = 'none'
}