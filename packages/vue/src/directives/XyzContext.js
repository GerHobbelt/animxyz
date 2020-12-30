import clsx from 'clsx'

function updateDirective(el, binding) {
	const xyzAttr = clsx(el.xyzStatic?.split(' '), binding.value)
	el.setAttribute('xyz', xyzAttr)
}

export default {
	bind(el, binding) {
		el.xyzStatic = el.getAttribute('xyz')
		updateDirective(el, binding)
	},
	update(el, binding) {
		updateDirective(el, binding)
	},
}
