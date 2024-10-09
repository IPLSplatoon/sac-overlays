module.exports = function (nodecg) {
    const breakCastersVisible = nodecg.Replicant('breakCastersVisible', { defaultValue: false });
    const activeBreakScene = nodecg.Replicant('activeBreakScene', 'ipl-overlay-controls');

    activeBreakScene.on('change', () => {
        breakCastersVisible.value = false;
    });
}
