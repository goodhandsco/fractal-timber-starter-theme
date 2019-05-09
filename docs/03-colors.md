{{#each colors as |palette key|}}

<div class="color-palette">
	<h3>{{ palette.title }}</h3>
	<div class="colors">
		{{#each values as |value key|}}
			<div class="color" style="color: {{ value }};">
				<div class="color-values">
					<pre>${{@key}}</pre>
					<div>{{value}}</div>
				</div>
			</div>
		{{/each}}
	</div>
</div>
{{/each}}
