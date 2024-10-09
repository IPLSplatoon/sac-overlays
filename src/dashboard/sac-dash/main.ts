const breakCastersCheckbox = document.getElementById('break-casters-checkbox') as HTMLInputElement;
const breakCastersVisible = nodecg.Replicant<boolean>('breakCastersVisible', { defaultValue: false });

breakCastersCheckbox.addEventListener('change', event => {
    breakCastersVisible.value = (event.target as HTMLInputElement).checked;
});

breakCastersVisible.on('change', newValue => {
    breakCastersCheckbox.checked = newValue;
});
